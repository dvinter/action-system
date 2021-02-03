import { MessageContent } from '@/domain/entities/message-content';
import { Mom } from '@/domain/entities/mom';

export interface MessageDTO {
  content: MessageContent;
  from: Mom;
}
