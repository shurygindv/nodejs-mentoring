export class ImageDto {
    public id: guidV4;
    public fileName?: string;
    public mimeType: string;
    public data: Buffer[];
}
