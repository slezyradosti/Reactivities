import { HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";
import { date } from "yup";
import { ChatComment } from "../models/comment";
import { store } from "./store";

export default class CommentSotre {
    comments: ChatComment[] = [];
    hubConnetion: HubConnection | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    createHubConnection = (activityId: string) => {
        if (store.activityStore.selectedActivity) {
            this.hubConnetion = new HubConnectionBuilder()
                .withUrl('https://localhost:5001/chat?activityId=' + activityId, {
                    accessTokenFactory: () => store.userStore.user?.token!
                })
                .withAutomaticReconnect()
                .configureLogging(LogLevel.Information)
                .build();

            this.hubConnetion.start().catch(error => console.log("Error establishing the connection: ", error));

            // the same name from ChatHub
            this.hubConnetion.on('LoadComments', (comments: ChatComment[]) => {
                // as we are upading upservable items -> use run in action
                runInAction(() => {
                    comments.forEach(comment => {
                        comment.createdAt = new Date(comment.createdAt + 'Z');
                    })
                    this.comments = comments
                });
            });

            this.hubConnetion.on('ReceiveComment', (comment: ChatComment) => {
                runInAction(() => {
                    comment.createdAt = new Date(comment.createdAt);
                    this.comments.unshift(comment)
                });
            })
        }
    }

    stopHubConnection = () => {
        this.hubConnetion?.stop().catch(error => console.log('Error stopping connection: ', error));
    }

    clearComents = () => {
        this.comments = [];
        this.stopHubConnection();
    }

    addComment = async (values: any) => {
        values.activityId = store.activityStore.selectedActivity?.id;

        try {
            await this.hubConnetion?.invoke('SendComment', values);
        } catch (error) {
            console.log(error);
        }
    }
} 