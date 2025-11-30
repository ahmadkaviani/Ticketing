import { action, makeAutoObservable, makeObservable, observable, runInAction } from "mobx";
import { Comment } from "../Comment";
import agent from '../api/agent';

export default class CommentStore {


    comments: Comment[] = [];
    loading = false;


    constructor() {
        makeAutoObservable(this);
    }
    create = async (comment: Comment) => {
        try {
            await agent.Comments.create(comment);
            runInAction(() => {
                window.location.reload();
            });
        } catch (error) {
            throw error;
        }
    }

    createWithAttachments = async (formData: FormData) => {
        this.loading = true;
        try {
            const created = await agent.Comments.createWithAttachments(formData);


            runInAction(() => {
                //this.comments.push(created);
                this.loading = false;
            });

            return created;
        } catch (error) {
            console.log(error);
            this.loading = false;
        }
    };


    /** آپلود فایل‌های ضمیمه برای یک کامنت که از قبل ایجاد شده */
    uploadAttachments = async (formData: FormData) => {
        try {
            await agent.Comments.uploadAttachments(formData);
        } catch (error) {
            console.log(error);
        }
    };



}