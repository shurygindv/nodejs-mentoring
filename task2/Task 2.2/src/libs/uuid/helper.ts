import * as uuid from 'uuid';

export const uuidHelper = {
    id: (): string => uuid.v4()
}