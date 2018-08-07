import { Component, OnInit } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';

// libs
import * as moment from 'moment';
import * as _ from 'lodash';
// service
import { NotificationService } from '../services/notification.service';


@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss'],
})

export class NotificationComponent implements OnInit {
    // new properties
    public notifications: Array<object> = [];

    constructor(private notificationService: NotificationService) {
        // subscribe to notification service
        this.notificationService.notificationSource.subscribe(
            notification =>
                this.checkNotification(notification));
    }

    getRelativeTime(time: Date): any {
        return moment(time).fromNow();
    }

    removeNotification(notificationToaster) {
        _.remove(this.notifications, function (notif) {
            return notif === notificationToaster;
        });
    }

    checkNotification(newNotification): void {
        console.log('notification', newNotification);
        this.notifications.push(newNotification);

        setTimeout(() => {
            _.remove(this.notifications, function (notif) {
                return notif === newNotification;
            });
        }, 2000);


    }


    clearNotification(notification, notifications): void {
        console.log('remove notification');
        setTimeout(() => {
            _.remove(notifications, function (notif) {
                return notif === notification;
            });
        }, 2000);
    }


    ngOnInit() {
        this.notifications = [];
    }
}
