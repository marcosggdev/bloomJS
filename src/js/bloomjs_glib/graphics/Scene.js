import Grid from '@/js/bloomjs_glib/graphics/Grid'

export default class Scene {

    constructor (drawables = [new Grid()], id = null, title = "Scene", description = "New Scene", illumination = []) {
        this.drawables = drawables;
        this.id = id;
        this.title = title;
        this.description = description;
        this.illumination = illumination;
    }

    clearScene () {
        for (let i = 0; i < this.drawables.length; i++) {
            if (this.drawables[i].constructor.name !== 'Grid') {
                this.removeDrawable(this.drawables[i]);
            }
        }
    }

    addDrawable (drawable) {
        this.drawables.push(drawable);
    }

    removeDrawable (drawable) {
        for (let i = 0; i < this.drawables.length; i++) {
            if (this.drawables[i] == drawable) {
                this.drawables.splice(i, 1);
                i = this.drawables.length;
            }
        }
    }

    addIllumination (light) {
        this.illumination.push(light);
    }

    removeIllumination (light) {
        for (let i = 0; i < this.illumination.length; i++) {
            if (this.illumination[i] == light) {
                this.drawables = this.drawables.splice(i, 1);
                i = this.drawables.length;
            }
        }
    }

    update () {
        for (let i = 0; i < this.drawables.length; i++) {
            if (this.drawables[i] != null) {
                this.drawables[i].update();
            }
        }
    }

    draw () {
        for (let i = 0; i < this.drawables.length; i++) {
            if (this.drawables[i] != null) {
                this.drawables[i].draw();
            }
        }
    }

    /* LINE not yet migrated to Vue project
    checkModelSelection (ray) {
        for (let i = 0; i < this.drawables.length; i++) {
            if (Line.checkLineModelIntersection(ray, this.drawables[i])) {
                if (this.drawables[i].selectable == true) {
                    return this.drawables[i];
                }
            }
        }
        return false;
    }
    */

    
}