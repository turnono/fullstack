// add module code

import { NgModule } from '@angular/core';
import { SentencePipe } from './sentence';

@NgModule({
  declarations: [SentencePipe],
  imports: [],
  providers: [],
  bootstrap: [],
  exports: [
    SentencePipe
  ]
})
export class PipesModule {}
