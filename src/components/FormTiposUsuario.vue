<template>
    <div name="FormTiposUsuario" style="margin-top:20px;height:100%">
        <div style="margin-top:50px">
            Holss
        </div>
        <div id="app" @mousemove="onDrag($event)" @mouseup="onDragStop()">
            <main>
                <div
                    v-for="(pane, paneIdx) in filledPanes"
                    :key="paneIdx"
                    :ref="`pane-${paneIdx}`"
                    class="pane"
                    >
                <div class="pane-header">{{ pane.name }}</div>
                <div
                    v-for="(card, cardIdx) in pane.cards"
                    :key="cardIdx"
                    :class="{ 'pane-card': true, 'dragging': draggedCardIdx === card.index }"
                    :ref="`card-${card.index}`"
                    @mousedown="onDragStart($event, card.index)"
                    >
                    {{ card.name }}
                </div>
                </div>
            </main>
            <div
                id="ghost-card"
                ref="ghostCard"
                :style="`
                        width: ${ghostCardStyle.width}px;
                        left: ${ghostCardStyle.pos.x}px; top: ${ghostCardStyle.pos.y - 10}px;
                        transform: ${ghostCardStyle.transform};
                        transform-origin: ${ghostCardStyle.transformOrigin};
                        `"
                :class="{ 'pane-card': true, 'active': draggedCardIdx !== -1, leaving: ghostCardStyle.leaving, animate: settings.animate }"
                >
                {{ draggedCard.name }}
            </div>
            <div class="settings" :class="{expanded: settingsExpanded}" @click="expandSettings">
                <h2>Settings <button v-show="settingsExpanded" @click.stop="wrapSettings">Close</button></h2>
                <h3>Animation</h3>
                <label>

                Trello style (not smooth)
                <input v-model="settings.trelloStyle" type="checkbox">
                </label>
                <label>
                Animate on end
                <input v-model="settings.animateEnd" type="checkbox">
                </label>
                <h3>Transform</h3>
                <label>
                Origin
                <select v-model="settings.transformOriginMode">
                    <option value="mouse">Mouse position</option>
                    <option value="center">Center</option>
                </select>
                </label>
                <label>
                Scale
                <input v-model="settings.scale" type="number">
                </label>
                <h3>Rotation</h3>
                <label>
                Offset Min
                <input v-model="settings.rotationOffset.min" type="number" :disabled="!settings.smooth">
                </label>
                <label>
                Offset Max
                <input v-model="settings.rotationOffset.max" type="number" :disabled="!settings.smooth">
                </label>
                <label>
                Mitigation
                <input v-model="settings.rotationMitigation" type="number" :disabled="!settings.smooth">
                </label>
                <h3>Debug</h3>
                <label>
                <input v-model="settings.debug.dataInspector" type="checkbox">
                Data inspector
                </label>
            </div>
            <div class="data-inspector" v-if="settings.debug.dataInspector">
                <p>Mouse X: {{ mousePos.x }}</p>
                <p>Mouse Y: {{ mousePos.y }}</p>
                <p>Dragged card index: {{ draggedCardIdx }}</p>
                <p>Pane overlapped index: {{ paneOverlappedIdx }}</p>
                <p>Ghost card X: {{ ghostCardStyle.pos.x }}</p>
                <p>Ghost card Y: {{ ghostCardStyle.pos.y }}</p>
                <p>Mouse distance from middle: {{ ghostCardStyle.percentDistanceMiddle * 100 }}%</p>
                <p>Ghost card rotation: {{ Math.round(ghostCardStyle.rotation * 100) / 100 }}</p>
                <p>Motion velocity: {{ ghostCardStyle.velocity }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    const SETTINGS = {
        trelloStyle: false,
        animateEnd: true,
        transformOriginMode: 'mouse', // or 'center'
        scale: 1.1,
        rotationOffset: {
            min: 1.2,
            max: 2
        },
        rotationMitigation: 0.2,
        debug: {
            dataInspector: false
        }
    }
    import axios from 'axios'
export default {
    data(){
        return{
            mousePos: {
            x: -1000,
            y: -1000
            },
            lastMousePos: { x: 0, y: 0 },
            draggedCardIdx: -1,
            paneOverlappedIdx: -1,
            ghostCardStyle: {
                leaving: false,
                pos: {
                x: 0,
                y: 0
                },
                width: 0,
                cursorDistance: {
                x: 0,
                y: 0
                },
                percentDistanceMiddle: 0,
                transform: '',
                transformOrigin: '',
                velocity: 0,
                rotation: 0
            },
            cards: [],
            panes: [
                {
                    name: 'Permisos'
                },
            ],
            settings: SETTINGS,
            settingsExpanded: false
        }
    },
    mounted(){
        axios.post('/tipoUsuarios/listarTodo')
            .then(response=>{
                for (let index = 0; index < response.data.length; index++) {
                    this.panes.push({name:response.data[index].nombre});
                    axios.post('/tipoUsuarios/listarPermisos/'+response.data[index].id_tipo_usuario)
                        .then(responsed=>{
                            for (let indexC = 0; indexC < responsed.data.length; indexC++) {
                                this.cards.push({
                                    name:responsed.data[indexC].nombre,
                                    paneIndex:index+1
                                });
                            }
                        })
                        .catch(e=>console.log(e));
                }
            })
            .catch(e=>console.log(e));
        
        axios.post('/permisos/listarTodo')
            .then(response=>{
                this.$store.state.permisos = response.data
                for (let index = 0; index < response.data.length; index++) {
                    this.cards.push({
                        name:response.data[index].nombre,
                        paneIndex:0
                    });
                }
            })
            .catch(e=>console.log(e));
        
        
        
    },
    computed: {
        filledPanes() {
        let filledPanes = this.panes.map(item => ({ name: item.name }));

        for (let i = 0; i < this.cards.length; i++) {
            let pane = filledPanes[this.cards[i].paneIndex];

            if (!pane.cards) pane.cards = [];
            pane.cards.push({ ...this.cards[i], index: i });
        }
        let perms= [];
        for (let index = 0; index < this.cards.length; index++) {
            if(this.cards[index].paneIndex === 0) perms.push(this.cards[index].name);
        }
        let pane0 = filledPanes[0];
        if(this.$store.state.permisos!==null && pane0.cards){
            for (let index = 0; index < this.$store.state.permisos.length; index++) {
                if(!perms.includes(this.$store.state.permisos[index].nombre)){
                    pane0.cards.push({
                        name:this.$store.state.permisos[index].nombre,
                        paneIndex:0,
                    })
                }
            }
        }

        return filledPanes;
        },
        draggedCard() {
        return this.cards[this.draggedCardIdx] || { name: '' };
        }
    },
    methods: {
        onDragStart(e, index) {
            let cardEl = this.$refs[`card-${index}`][0];
            let cardRect = cardEl.getBoundingClientRect();
            
            document.documentElement.style.cursor = 'grabbing';

            let paddingLeft = parseFloat(getComputedStyle(cardEl).paddingLeft);
            let paddingRight = parseFloat(getComputedStyle(cardEl).paddingRight);

            this.mousePos.x = e.pageX;
            this.mousePos.y = e.pageY;

            this.draggedCardIdx = index;

            this.ghostCardStyle.width =
                cardEl.clientWidth - paddingLeft - paddingRight;
            this.ghostCardStyle.cursorDistance.x = e.pageX - cardRect.x;
            this.ghostCardStyle.cursorDistance.y = e.pageY - cardRect.y;

            this.setGhostCardStyle(e);
            this.updateUI();

            if (this.settings.transformOriginMode === 'center')
                this.ghostCardStyle.transformOrigin = 'center';
            else
                this.ghostCardStyle.transformOrigin = `${this.ghostCardStyle.cursorDistance.x}px ${this.ghostCardStyle.cursorDistance.y}px`;
            this.ghostCardStyle.percentDistanceMiddle =
                this.ghostCardStyle.cursorDistance.x - cardEl.clientWidth / 2;
            this.ghostCardStyle.percentDistanceMiddle = Math.abs(
                this.ghostCardStyle.percentDistanceMiddle
            );
            this.ghostCardStyle.percentDistanceMiddle /= cardEl.clientWidth / 2;
            this.ghostCardStyle.percentDistanceMiddle =
                Math.round(this.ghostCardStyle.percentDistanceMiddle * 100) / 100;
        },

        onDrag(e) {
            e = e || window.event;
            if (this.draggedCardIdx === -1)
                return;
            this.mousePos.x = e.pageX;
            this.mousePos.y = e.pageY;
        },

        updateUI() {
            let dragX = this.mousePos.x,
                dragY = this.mousePos.y;

            if (this.draggedCardIdx === -1 || this.ghostCardStyle.leaving) return;

            if (!dragX && !dragY) {
                this.lastMousePos.x = 0;
                this.lastMousePos.y = 0;
                return requestAnimationFrame(this.updateUI);
            }
            this.findTransformValues();
            this.setGhostCardStyle(true);

            let isOverlapping;

            for (let i = 0, paneEl = null; (paneEl = this.$refs[`pane-${i}`]); i++) {
                paneEl = paneEl[0] ? paneEl[0] : paneEl;

                isOverlapping = this.checkOverlap(
                { x: dragX, y: dragY },
                paneEl.getBoundingClientRect()
                );

                if (isOverlapping && this.paneOverlappedIdx === i)
                return requestAnimationFrame(this.updateUI);
                else if (isOverlapping) {
                this.paneOverlappedIdx = i;
                break;
                }
            }

            if (!isOverlapping) {
                return requestAnimationFrame(this.updateUI);
            }
            this.putCardInPane();
            return requestAnimationFrame(this.updateUI);
        },

        onDragStop() {
            if (this.draggedCardIdx === -1)
                return;
                    document.documentElement.style.cursor = 'default';
            let cardEl = this.$refs[`card-${this.draggedCardIdx}`] && this.$refs[`card-${this.draggedCardIdx}`][0]
            let cardRect = cardEl.getBoundingClientRect();

            if (!this.settings.animateEnd) {
                return this.resetValues()
            }
            setTimeout(() => {
                this.resetValues();
            }, 100);
            this.ghostCardStyle.leaving = true;
            let xOffset = cardRect.x - this.ghostCardStyle.pos.x
            let yOffset = cardRect.y - this.ghostCardStyle.pos.y
            this.ghostCardStyle.transform = `scale(1) translate(${xOffset}px, ${yOffset}px)`
        },

        resetValues() {
            this.draggedCardIdx = -1;
            this.paneOverlappedIdx = -1;
            this.lastMousePos.x = 0;
            this.lastMousePos.y = 0;
            this.ghostCardStyle.x = -1000;
            this.ghostCardStyle.y = -1000;
            this.ghostCardStyle.width = 0;
            this.ghostCardStyle.cursorDistance.x = 0;
            this.ghostCardStyle.cursorDistance.y = 0;
            this.ghostCardStyle.transform = '';
            this.ghostCardStyle.leaving = false;
            this.ghostCardStyle.percentDistanceMiddle = 0;
        },

        checkOverlap(drag, rect) {
            if (drag.x < rect.x || drag.x > rect.x + rect.width) return false;
            if (drag.y < rect.y || drag.y > rect.y + rect.height) return false;
            return true;
        },

        putCardInPane() {
            this.cards[this.draggedCardIdx].paneIndex = this.paneOverlappedIdx;
            //this.cards.push(aux);
        },

        setGhostCardStyle(isDragstart) {
            let dragX = this.mousePos.x,
                dragY = this.mousePos.y;
            let transform = [];

            if (isDragstart)
                transform.push(`scale(${this.settings.scale})`);

            transform.push(`rotate(${this.ghostCardStyle.rotation}deg)`);
            this.ghostCardStyle.transform = transform.join(' ');
            this.ghostCardStyle.pos.x = dragX - this.ghostCardStyle.cursorDistance.x;
            this.ghostCardStyle.pos.y = dragY ;//- this.ghostCardStyle.cursorDistance.y;
        },

        findTransformValues() {

            if (this.settings.trelloStyle) {
                this.ghostCardStyle.rotation = '4';
                this.lastMousePos.x = this.mousePos.x;
                this.lastMousePos.y = this.mousePos.y;
                return;
            }


            let velocity = this.mousePos.x - this.lastMousePos.x;
            let rotation = this.ghostCardStyle.rotation || 0;

            let rotationMin = this.settings.rotationOffset.min;
            let rotationMax = this.settings.rotationOffset.max;
            let rotationOffset =
                (rotationMax - rotationMin) *
                (1 - this.ghostCardStyle.percentDistanceMiddle);
            let rotationMitigation = this.settings.rotationMitigation

            rotation =
                rotation * (1 - rotationMitigation) +
                this.sigmoid(velocity) * (rotationMin + rotationOffset);
            if (Math.abs(rotation) < 0.01) rotation = 0;

            this.ghostCardStyle.velocity = velocity;
            this.ghostCardStyle.rotation = rotation
            this.lastMousePos.x = this.mousePos.x;
            this.lastMousePos.y = this.mousePos.y;
        },

        sigmoid(x) {
            return x / (1 + Math.abs(x));
        },

        expandSettings() {
            if (this.settingsExpanded) return;
            this.settingsExpanded = true;
        },

        wrapSettings() {
            this.settingsExpanded = false;
        }
    },
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import '../assets/styles/roles.scss';
</style>