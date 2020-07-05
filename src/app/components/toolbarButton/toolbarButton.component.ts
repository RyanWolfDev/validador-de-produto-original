import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ToolbarButton } from "../../models/toolbarButton.model";

@Component({
  selector: "toolbar-button",
  moduleId: module.id,
  templateUrl: "toolbarButton.component.html",
})
export class ToolbarButtonComponent {
  @Input() toolbarButton: ToolbarButton;
  @Output() onClick: EventEmitter<any> = new EventEmitter();

  callFunction(event) {
    this.onClick.emit(event);
  }
}
