import { Schema, model, connect } from 'mongoose';


export interface IDegreeCourse {
  id: string;
  name: string;
  shortName: string;
  universityName: string;
  universityShortName: string;
  departmentName: string;
  departmentShortName: string;
}


const degreeCourseSchema = new Schema<IDegreeCourse>({
  name: { type: String, required: true },
  shortName: { type: String, required: true },
  universityName: { type: String, required: true },
  universityShortName: { type: String, required: true },
  departmentName: { type: String, required: true },
  departmentShortName: { type: String, required: true },
});


export const DegreeCourseModel = model<IDegreeCourse>('DegreeCourse', degreeCourseSchema);