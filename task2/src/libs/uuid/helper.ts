import {uuid} from '.';

export const uuidHelper = {
    id: (): string => uuid.v4()
}