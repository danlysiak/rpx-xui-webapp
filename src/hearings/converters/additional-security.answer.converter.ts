import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {State} from '../store';
import {AnswerConverter} from './answer.converter';

export class AdditionalSecurityAnswerConverter implements AnswerConverter {

  public transformAnswer(hearingState$: Observable<State>): Observable<string> {
    return hearingState$.pipe(
      map(state => {
        return state.hearingRequest.hearingRequestMainModel.caseDetails.caseAdditionalSecurityFlag ?
          'Yes' : 'No';
      })
    );
  }
}
