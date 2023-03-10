//
//  NotesView.ts
//
//  Generated by Poll Castillo on 09/03/2023.
//
import { Config } from "../../../Configs.js";
import { getEntitiesData } from "../../../endpoints.js";
import { CloseDialog, fixDate, renderRightSidebar } from "../../../tools.js";
import { UIContentLayout, UIRightSidebar } from "./Layout.js";
import { UITableSkeletonTemplate } from "./Template.js";
// Local configs
const tableRows = Config.tableRows;
let currentPage = Config.currentPage;
const pageName = 'Notas';
const GetNotes = async () => {
    const notes = await getEntitiesData('Note');
    return notes;
};
export class Notes {
    constructor() {
        this.dialogContainer = document.getElementById('app-dialogs');
        this.siebarDialogContainer = document.getElementById('entity-editor-container');
        this.appContainer = document.getElementById('datatable-container');
        this.render = async () => {
            let notesArray = await GetNotes();
            this.appContainer.innerHTML = '';
            this.appContainer.innerHTML = UIContentLayout;
            // Getting interface elements
            const viewTitle = document.getElementById('view-title');
            const tableBody = document.getElementById('datatable-body');
            // Changing interface element content
            viewTitle.innerText = pageName;
            tableBody.innerHTML = UITableSkeletonTemplate.repeat(tableRows);
            // Exec functions
            this.load(tableBody, currentPage, notesArray);
            this.searchNotes(tableBody, notesArray);
            // Rendering icons
            // @ts-ignore
            feather.replace();
        };
        this.load = (tableBody, currentPage, notes) => {
            tableBody.innerHTML = ''; // clean table
            // configuring max table row size
            currentPage--;
            let start = tableRows * currentPage;
            let end = start + tableRows;
            let paginatedItems = notes.slice(start, end);
            // Show message if page is empty
            if (notes.length === 0) {
                let row = document.createElement('TR');
                row.innerHTML = `
            <td>No existen datos<td>
            <td></td>
            <td></td>
            `;
                tableBody.appendChild(row);
            }
            else {
                for (let i = 0; i < paginatedItems.length; i++) {
                    let note = paginatedItems[i]; // getting note items
                    let row = document.createElement('TR');
                    row.innerHTML += `
                    <td>${note.title}</td>
                    <td>${note.content}</td>
                    <td id="table-date">${note.createdDate}</td>
                    <td>
                        <button class="button" id="entity-details" data-entityId="${note.id}">
                            <i data-feather="search" class="table_icon"></i>
                        </button>
                    </td>
                `;
                    tableBody.appendChild(row);
                    this.previewNote();
                    fixDate();
                }
            }
        };
        this.searchNotes = async (tableBody, notes) => {
            const search = document.getElementById('search');
            await search.addEventListener('keyup', () => {
                const arrayNotes = notes.filter((note) => `${note.title}`
                    .toLowerCase()
                    .includes(search.value.toLowerCase()));
                let filteredNotes = arrayNotes.length;
                let result = arrayNotes;
                if (filteredNotes >= Config.tableRows)
                    filteredNotes = Config.tableRows;
                this.load(tableBody, currentPage, result);
                // Rendering icons
                // @ts-ignore
                feather.replace();
            });
        };
        this.previewNote = async () => {
            const open = document.getElementById('entity-details');
            open.addEventListener('click', () => {
                renderInterface('User');
            });
            const renderInterface = async (entities) => {
                renderRightSidebar(UIRightSidebar);
                this.closeRightSidebar();
            };
        };
        this.closeRightSidebar = () => {
            const closeButton = document.getElementById('close');
            const editor = document.getElementById('entity-editor');
            closeButton.addEventListener('click', () => {
                new CloseDialog().x(editor, this.siebarDialogContainer);
            });
        };
    }
}
