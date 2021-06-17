import { TextSectionInput } from './components/dialog/input/text-input.js';
import { MediaSectionInput } from './components/dialog/input/media-input.js';
import { InputDiaglog, MediaData, TextData } from './components/dialog/dialog.js';
import { Component } from './components/component.js';
import { VideoComponent } from './components/page/item/video.js';
import { TodoComponent } from './components/page/item/todo.js';
import { NoteComponent } from './components/page/item/note.js';
import { ImageComponent } from "./components/page/item/image.js";
import { Composable, PageComponent, PageItemComponent } from "./components/page/page.js";

type InputComponentConstructor<T = (MediaData | TextData) & Component> = {
    new (): T;
}
class App {
    private readonly page: Component & Composable;
    constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
        this.page = new PageComponent(PageItemComponent); // make PageComponent with PageItemComponent 
        this.page.attachTo(appRoot);

        // const image = new ImageComponent('Image Title', 'https://picsum.photos/600/300');
        // this.page.addChild(image);
        
        // const video = new VideoComponent('Video Title', 'https://youtu.be/K3-jG52XwuQ');
        // this.page.addChild(video);

        // const note = new NoteComponent('Note Title', 'Note Body');
        // this.page.addChild(note);

        // const todo = new TodoComponent('Todo Title', 'Todo Item');
        // this.page.addChild(todo);

        // const imageBtn = document.querySelector('#new-image')! as HTMLButtonElement;
        // imageBtn.addEventListener('click', () => {
        //     const dialog = new InputDiaglog();
        //     const inputSection = new MediaSectionInput();
        //     dialog.addChild(inputSection);
        //     dialog.attachTo(dialogRoot);
            
        //     dialog.setOnCloseListener(() => {
        //         dialog.removeFrom(dialogRoot);
        //     });

        //     dialog.setOnSubmitListener(() => {
        //         const image = new ImageComponent(inputSection.title, inputSection.url);
        //         this.page.addChild(image);
        //         dialog.removeFrom(dialogRoot);
        //     });
        // });

        // const videoBtn = document.querySelector('#new-video')! as HTMLButtonElement;
        // videoBtn.addEventListener('click', () => {
        //     const dialog = new InputDiaglog();
        //     const inputSection = new MediaSectionInput();
        //     dialog.addChild(inputSection);
        //     dialog.attachTo(dialogRoot);
            
        //     dialog.setOnCloseListener(() => {
        //         dialog.removeFrom(dialogRoot);
        //     });

        //     dialog.setOnSubmitListener(() => {
        //         const video = new VideoComponent(inputSection.title, inputSection.url);
        //         this.page.addChild(video);
        //         dialog.removeFrom(dialogRoot);
        //     });
        // });

        this.bindElementToDialog<MediaSectionInput> (
            '#new-image',
             MediaSectionInput,
             (input: MediaSectionInput) => new ImageComponent(input.title, input.url)
        );

        this.bindElementToDialog<MediaSectionInput> (
            '#new-video',
             MediaSectionInput,
             (input: MediaSectionInput) => new VideoComponent(input.title, input.url)
        );

        this.bindElementToDialog<TextSectionInput> (
            '#new-note',
             TextSectionInput,
             (input: TextSectionInput) => new NoteComponent(input.title, input.body)
        );

        this.bindElementToDialog<TextSectionInput> (
            '#new-todo',
             TextSectionInput,
             (input: TextSectionInput) => new TodoComponent(input.title, input.body)
        );

        // For demo :)
    this.page.addChild(new ImageComponent('Image Title', 'https://picsum.photos/800/400'));
    this.page.addChild(new VideoComponent('Video Title', 'https://youtu.be/D7cwvvA7cP0'));
    this.page.addChild(new NoteComponent('Note Title', "Don't forget to code your dream"));
    this.page.addChild(new TodoComponent('Todo Title', 'TypeScript Course!'));
    this.page.addChild(new ImageComponent('Image Title', 'https://picsum.photos/800/400'));
    this.page.addChild(new VideoComponent('Video Title', 'https://youtu.be/D7cwvvA7cP0'));
    this.page.addChild(new NoteComponent('Note Title', "Don't forget to code your dream"));
    this.page.addChild(new TodoComponent('Todo Title', 'TypeScript Course!'));



    }

    private bindElementToDialog<T extends (MediaData | TextData) & Component> (
        selector: string, 
        InputComponent: InputComponentConstructor<T>,
        makeSection: (input: T) => Component
        ) {

        const element = document.querySelector(selector)! as HTMLButtonElement;
        element.addEventListener('click', () => {
            const dialog = new InputDiaglog();
            const input = new InputComponent();
            dialog.addChild(input);
            dialog.attachTo(this.dialogRoot);
            
            dialog.setOnCloseListener(() => {
                dialog.removeFrom(this.dialogRoot);
            });

            dialog.setOnSubmitListener(() => {
                const image = makeSection(input);
                this.page.addChild(image);
                dialog.removeFrom(this.dialogRoot);
            });
        });

    }

}

new App(document.querySelector('.document')! as HTMLElement, document.body);