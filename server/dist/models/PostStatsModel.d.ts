import { Model, RelationMappings } from 'objection';
import { PostStats } from '@/types';
declare class PostStatsModel extends Model implements PostStats {
    id: number;
    post_id: number;
    like_count: number;
    comment_count: number;
    story_count: number;
    created_at: string;
    updated_at: string;
    static get tableName(): string;
    static get idColumn(): string;
    static get postIdColumn(): string;
    static get likeCountColumn(): string;
    static get commentCountColumn(): string;
    static get storyCountColumn(): string;
    static get jsonSchema(): {
        type: string;
        required: string[];
        properties: {
            id: {
                type: string;
            };
            post_id: {
                type: string;
            };
            comment_count: {
                type: string;
            };
            like_count: {
                type: string;
            };
            story_count: {
                type: string;
            };
        };
    };
    static get relationMappings(): RelationMappings;
}
export default PostStatsModel;
//# sourceMappingURL=PostStatsModel.d.ts.map