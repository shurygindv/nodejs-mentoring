import {BaseMapper} from '../../../lib/mapping';

import {GroupDboModel} from '../../../providers/sequelize/models/group-factory';
// to =>
import {GroupModel} from '../models/group-model';

export class GroupModelDboMapper extends BaseMapper {
    public fromDboToGroupModel(
        model: GroupDboModel,
    ): Promise<TS.MaybeNull<GroupModel>> {
        if (!model) {
            return this.empty();
        }

        const userModel: GroupModel = this.createInstance<GroupModel>(
            GroupModel,
            {
                id: model.id,
                name: model.name,
                permissions: model.permissions,
            },
        );

        return this.beLazy(userModel);
    }

    public async fromDboToGroupModelArray(
        models: GroupDboModel[],
    ): Promise<GroupModel[]> {
        const results = (models || []).map(
            async (dboModel: GroupDboModel) =>
                await this.fromDboToGroupModel(dboModel),
        );

        return await Promise.all(results);
    }
}
