import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';

@EventSubscriber()
export class AuditSubscriber implements EntitySubscriberInterface {
    beforeInsert(event: InsertEvent<any>) {
        // 💡 檢查實體是否有這些欄位
        if ('createdBy' in event.entity && !event.entity.createdBy) {
            event.entity.createdBy = 'system_auto';
        }
    }
}