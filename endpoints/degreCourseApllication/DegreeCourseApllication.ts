import { Schema, model, connect } from 'mongoose';

export interface IDegreeCourseApplication {
  id: string;
  applicantUserID: string; // Korrigiert von applicationUserID (number) zu applicantUserID (string)
  degreeCourseID: string;
  targetPeriodYear: number; // Korrigiert von targetsPeriodYear zu targetPeriodYear
  targetPeriodShortName: string;
}

const degreeCourseApplicationSchema = new Schema<IDegreeCourseApplication>({
  applicantUserID: { type: String, required: true }, // Korrigiert
  degreeCourseID: { type: String, required: true },
  targetPeriodYear: { type: Number, required: true }, // Korrigiert
  targetPeriodShortName: { type: String, required: true, enum: ['WiSe', 'SoSe'] },
});

degreeCourseApplicationSchema.index(
  { applicantUserID: 1, degreeCourseID: 1, targetPeriodShortName: 1, targetPeriodYear: 1 }, // Korrigiert
  { unique: true }
);

export const DegreeCourseApplicationModel = model<IDegreeCourseApplication>('DegreeCourseApplication', degreeCourseApplicationSchema);