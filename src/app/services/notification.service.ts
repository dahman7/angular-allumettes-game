import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'; // share data between componnets


import * as _ from 'lodash';

@Injectable()
export class NotificationService {

    public notificationSource = new BehaviorSubject<any>([]);
    currentNotification = this.notificationSource.asObservable();

    constructor() { }

    public notifications = [];


    /**
     * Return the list of all notification messages
     * @method getNotifications
     * @return list of all notification messages
     */
    getNotifications(): any {
        return this.notifications;
    }

    /**
     * clear the list of notifaction
     * @method clearNotification
     * @return list of all notification messages
     */
    clearNotification(): void {
        while (this.notifications.length > 0) {
            delete (this.notifications[0]);
        }

    }

    /**
     *  This method :
     *  - Adds notification to the services list
     */
    notify(notification): void {
        if (notification) {
            notification.timestamp = Date.now();
            this.notificationSource.next(notification);
        }
    }

    /**
     * Return the list of all notification messages
     * @method getNotifications
     * @return list of all notification messages
     */
    updateNotification(notification): void {
        if (notification) {
            notification.timestamp = Date.now();
            this.notificationSource.next(notification);
        }
    }


    sendNotification(level: string, state : object, update: boolean) {
        const notification = {
            'level': 'info', // success,danger
            'progress': true,
            'closing': false,
            'data': {
                'title': 'CPU played , your turn now',
                'parameters': {},
            }
        };
        notification.level = level;
        notification.data.parameters = state;
        this.notify(notification);
    }

}
