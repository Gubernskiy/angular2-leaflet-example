import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, HostListener } from "@angular/core";

@Component({
    moduleId: module.id,
    selector: "my-slider",
    templateUrl: "slider.widget.html",
    styleUrls: ["slider.widget.css"]
})

export class SliderWidget {
    @Input() sliderName:string = "";
    @Input() minValue:number = 0;
    @Input() maxValue:number = 100;
    @Input() value:number;

    @ViewChild("sliderHandle", {read: ElementRef}) handlerEl:ElementRef;
    @ViewChild("slideValLine", {read: ElementRef}) slideValEl:ElementRef;
    @Output() onValChange = new EventEmitter();

    private startX:number = 0;
    private x:number = 0;
    private isMoving:boolean = false;
    private pxVal:number;

    private slideBlock:HTMLElement;
    private handler:HTMLElement;
    private sliderValLine:HTMLElement;

    public ngAfterViewInit() {
        let self = this;
        this.handler = this.handlerEl.nativeElement;
        this.sliderValLine = this.slideValEl.nativeElement;
        this.slideBlock = this.handler.parentElement;

        setTimeout(()=> {
            self.getValInPixel();

            if (typeof(self.value)!="undefined") {
                self.setValue(self.value);
            }
        });
    }

    private onMouseDown(event:MouseEvent) {
        this.isMoving = true;
        this.startX = event.pageX - this.x;
    }

    @HostListener("document:mousemove", ["$event"])
    private onMouseMove(event:MouseEvent) {
        if (this.isMoving) {
            // предотвращает выделение текста курсором
            event.preventDefault();
            let newX = event.pageX - this.startX;
            if (newX > 0 && (newX < this.slideBlock.offsetWidth)) {
                this.handler.style.left = newX + "px";
                this.x = newX;
            } else if (newX < 0) {
                this.handler.style.left = "0px";
                this.x = 0;
            } else if (newX > this.slideBlock.offsetWidth) {
                this.handler.style.left = this.slideBlock.offsetWidth + "px";
                this.x = this.slideBlock.offsetWidth;
            }

            //--- подкрашиваем линию, обозначающую значение
            this.sliderValLine.style.width = this.x + "px";
            //--- сообщаем о изменении значения
            this.onValChange.emit(this.getValFromPosition(this.x));
        }
    }

    @HostListener("document:mouseup", ["$event"])
    private onMouseUp(event:MouseEvent) {
        this.isMoving = false;
    }

    /**
     * Count value in pixel
     */
    private getValInPixel() {
        this.pxVal = this.slideBlock.offsetWidth / (this.maxValue - this.minValue);
    }

    private getValFromPosition(left:number):number{
        return Math.ceil(left / this.pxVal) - Math.abs(this.minValue);
    }

    /**
     * set new value
     */
    public setValue(value:number) {
        if(!value) value=0;

        if (value > this.maxValue) {
            value = this.maxValue;
        }
        else if (value < this.minValue) {
            value = this.minValue;
        }

        let left:number = Math.ceil((value-this.minValue) * this.pxVal);
        this.handler.style.left = left + "px";
        this.x = left;
        this.sliderValLine.style.width = left + "px";

        //--- emit changes
        this.onValChange.emit(value);
    }
}