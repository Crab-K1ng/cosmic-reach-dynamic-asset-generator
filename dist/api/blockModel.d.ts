import { Box3, Matrix4, Vector2 } from "three";
import { Texture } from "./texture";
import { Mod } from "./mod";
import { Identifier } from "./identifier";
export interface SerializedBlockModelFace {
    uv: [number, number, number, number];
    ambientocclusion?: boolean;
    cullFace: boolean;
    texture: string;
    uvRotation?: number;
}
export declare class BlockModelFace {
    receiveAO: boolean | null;
    texture: Texture | null;
    uvMin: Vector2;
    uvMax: Vector2;
    cull: boolean;
    uvRotation: (0 | 90 | 180 | 270) | null;
    serialize(textureId: string): SerializedBlockModelFace;
    clone(): BlockModelFace;
}
interface SerializedBlockTexture {
    fileName: string;
}
export interface SerializedBlockModelCuboid {
    localBounds: [
        number,
        number,
        number,
        number,
        number,
        number
    ];
    faces: {
        localNegX?: SerializedBlockModelFace;
        localPosX?: SerializedBlockModelFace;
        localNegY?: SerializedBlockModelFace;
        localPosY?: SerializedBlockModelFace;
        localNegZ?: SerializedBlockModelFace;
        localPosZ?: SerializedBlockModelFace;
    };
}
export declare class BlockModelCuboid {
    box: Box3;
    west: BlockModelFace;
    east: BlockModelFace;
    south: BlockModelFace;
    north: BlockModelFace;
    down: BlockModelFace;
    up: BlockModelFace;
    constructor();
    setSize(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number, preventUVReset?: boolean): void;
    recalculateCullFaces(): void;
    recalculateUVs(): void;
    getAllFaces(): BlockModelFace[];
    applyTransformation(transformation: Matrix4): void;
    setAllTextures(texture: Texture): void;
    clone(): BlockModelCuboid;
    serialize(textureIds: Map<Texture, string>): SerializedBlockModelCuboid;
    getUsedTextures(): Set<Texture>;
}
export declare class SerializedBlockModel {
    textures: Record<string, SerializedBlockTexture>;
    cuboids: SerializedBlockModelCuboid[];
    cullsSelf?: boolean;
    isTransparent?: boolean;
    parent?: string;
}
export declare class BlockModel {
    private mod;
    private cuboids;
    id: Identifier;
    cullsSelf: boolean;
    transparent: boolean;
    parent: Identifier | string | BlockModel;
    constructor(mod: Mod, id: Identifier);
    setParent(parent: Identifier | string | BlockModel): void;
    getUsedTextures(): Set<Texture>;
    recalculateUVs(): void;
    createCuboid(box?: Box3): BlockModelCuboid;
    addCuboid(...cuboids: BlockModelCuboid[]): void;
    removeCuboid(...cuboids: BlockModelCuboid[]): void;
    getCuboids(): BlockModelCuboid[];
    clone(newId: string): BlockModel;
    addModel(...models: BlockModel[]): void;
    applyTransformation(transformation: Matrix4): void;
    setAllTextures(texture: Texture): void;
    serialize(): SerializedBlockModel;
    getBlockModelPath(): string;
    getBlockModelId(): Identifier;
}
export {};
