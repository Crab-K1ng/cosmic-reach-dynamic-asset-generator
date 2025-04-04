/*
Copyright 2025 arlojay

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { Canvas, createCanvas, Image, loadImage } from "canvas";
import { Mod } from "./mod";
import { Identifier } from "./identifier";

export class Texture {
    public id: string;
    public texture: Image | string | Identifier = null;

    public static async loadFromFile(id: string, fullPath: string | Buffer) {
        return new Texture(id, await loadImage(fullPath));
    }
    public static async createFromCanvas(id: string, canvas: Canvas) {
        return await this.loadFromFile(id, canvas.toDataURL());
    }
    public static async createFromImage(id: string, image: Image) {
        return await this.loadFromFile(id, image.src);
    }

    constructor(id: string, texture?: Image | string | Identifier) {
        this.id = id;
        if(texture != null) this.texture = texture;
    }

    public getAsBlockTexturePath(): string {
        return "textures/blocks/" + this.id + ".png";
    }
    public getAsBlockTextureId(mod: Mod): Identifier {
        if(this.texture instanceof Identifier) return this.texture.derive("textures/blocks/" + this.texture.getItem() + ".png");
        if(typeof this.texture == "string") return Identifier.fromId(this.texture);
        return new Identifier(mod, "textures/blocks/" + this.id + ".png");
    }
    public getAsItemTexturePath(): string {
        return "textures/items/" + this.id + ".png";
    }
    public getAsItemTextureId(mod: Mod): Identifier {
        if(this.texture instanceof Identifier) return this.texture.derive("textures/items/" + this.texture.getItem() + ".png");
        if(typeof this.texture == "string") return Identifier.fromId(this.texture);
        return new Identifier(mod, "textures/items/" + this.id + ".png");
    }
    public createTextureStream() {
        if(!(this.texture instanceof Image)) return null;

        const canvas = createCanvas(this.texture.width, this.texture.height);
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(this.texture, 0, 0);
        return canvas.createPNGStream();
    }
    public getImage() {
        if(this.texture instanceof Image) return this.texture;

        return null;
    }
}