import {TData} from "../interfaces/interfaces";
import {TTag} from "../interfaces/interfaces";

export const searchTags: TTag[] = [
    {
        name: 'Angular',
        active: true,
        id: 'angular'
    },
    {
        name: 'SAP ABAP',
        active: false,
        id: 'sap_abap',
    },
    {
        name: 'Java',
        active: false,
        id: 'java',
    },
    {
        name: 'Design',
        active: false,
        id: 'design',
    },
    {
        name: 'SAP TM Consultant',
        active: false,
        id: 'sap_tm_consultant',
    },
    {
        name: 'Frontend',
        active: false,
        id: 'frontend',
    },
    {
        name: 'Programmer',
        active: false,
        id: 'programmer',
    },
    {
        name: 'Python',
        active: false,
        id: 'python',
    },
    {
        name: 'DevOps',
        active: false,
        id: 'devops',
    },
    {
        name: 'React',
        active: false,
        id: 'react',
    }
]

export const newCard: TData = {
    title: '',
    subtitle: [
        {article: ['', '']},
    ],
    tags: [],
    date: new Date(),
    img: '',
    author: '',
}