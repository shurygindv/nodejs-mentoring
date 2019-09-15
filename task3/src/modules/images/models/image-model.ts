
export class ImageModel {
    public id?: Guid_v4;
    public fileName?: string;
    public mimeType: string;
    public data: Buffer[]
}