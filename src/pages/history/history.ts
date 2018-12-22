import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { StorageService } from '../../services/storage';
import { STORE_KEY, DPR } from '../../utils/constants';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-history',
    templateUrl: 'history.html',
})
export class HistoryPage {

    public isEmpty: boolean;
    public historyPages: any[];

    constructor(
        public navCtrl: NavController,
        public viewCtrl: ViewController,
        public navParams: NavParams,
        public storage: StorageService
    ) {
        this.isEmpty = true;
        this.historyPages = [];

        this._init();
    }

    dismiss(): void {
        this.viewCtrl.dismiss();
    }

    async _init() {
        this.historyPages = await this.storage.get(STORE_KEY.HISTORY_PAGE) || [];
        if (!this.historyPages.length) {
            return;
        }
        console.log(this.historyPages);

        this.isEmpty = false;
        const pageWidth = window.innerWidth;
        const pageHeight = window.innerHeight;
        const imgSize = await this._getImageSize(this.historyPages[0].image) as any;
        const imgScale = 0.75;
        const imgWidth = imgSize.width * imgScale;
        const imgHeight = imgSize.height * imgScale;

        for (let i = 0; i < this.historyPages.length; ++i) {
            const page = this.historyPages[i];
            page.style = {
                width: imgScale * 100 + '%',
                left: (pageWidth - imgWidth) * Math.random() + 'px',
                top: (pageHeight - imgHeight) * Math.random() + 'px',
                transform: 'rotateZ(' + (Math.random() * 2 - 1) * 30 + 'deg)'
            };
        }
    }

    async _getImageSize(src) {
        return await new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                console.log(img.width, img.height);
                resolve({
                    width: img.width / DPR,
                    height: img.height / DPR
                });
            };
            img.onerror = reject;
            img.src = src;
        });
    }

}
