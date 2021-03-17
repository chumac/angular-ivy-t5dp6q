import { ResignEffects } from '../../store/resign';
import { ResignationEffects } from '../../store/resignation';
import { InterviewEffects } from '../../store/setup/interview';
import { ChecklistEffects } from '../setup/checklist';
import { QueueEffects } from '../queue/queue.effects';
import { ProcessEffects } from '../process/process.effects';
import { HrProcessEffects } from '../hr-process/hr-process.effects';
import { HrResignationEffects } from '../hr-resignation';
import { HrResponseQueueEffects } from '../hr-response-queue';

export const exitEffects = [ResignEffects, ResignationEffects, HrResignationEffects, ProcessEffects, HrProcessEffects, QueueEffects, HrResponseQueueEffects, InterviewEffects, ChecklistEffects];
