import * as _ from 'lodash';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HearingDateEnum } from '../models/hearings.enum';
import { State } from '../store/reducers';
import { IsAmendedConverter } from './is-amended.converter';

export class HearingSpecificDateAmendedConverter implements IsAmendedConverter {
  public transformIsAmended(hearingState$?: Observable<State>): Observable<boolean> {
    return hearingState$.pipe(map(state => {
      const objAHearingWindow = state.hearingRequestToCompare.hearingRequestMainModel.hearingDetails.hearingWindow;
      const objBHearingWindow = state.hearingRequest.hearingRequestMainModel.hearingDetails.hearingWindow;
      if (objAHearingWindow.dateRangeStart && objBHearingWindow.dateRangeStart) {
        const isStartDatesUpdated = moment(objAHearingWindow.dateRangeStart).format(HearingDateEnum.DefaultFormat) !== moment(objBHearingWindow.dateRangeStart).format(HearingDateEnum.DefaultFormat);
        const isEndDatesUpdated = moment(objAHearingWindow.dateRangeEnd).format(HearingDateEnum.DefaultFormat) !== moment(objBHearingWindow.dateRangeEnd).format(HearingDateEnum.DefaultFormat);
        return isStartDatesUpdated || isEndDatesUpdated;
      } else if (objAHearingWindow.firstDateTimeMustBe && objBHearingWindow.firstDateTimeMustBe) {
        const isSelectedDatesUpdated = moment(objAHearingWindow.firstDateTimeMustBe).format(HearingDateEnum.DefaultFormat) !== moment(objBHearingWindow.firstDateTimeMustBe).format(HearingDateEnum.DefaultFormat);
        return isSelectedDatesUpdated;
      } else {
        return !_.isEqual(_.omitBy(objAHearingWindow, _.isNil), _.omitBy(objBHearingWindow, _.isNil));
      }
    }));
  }
}
