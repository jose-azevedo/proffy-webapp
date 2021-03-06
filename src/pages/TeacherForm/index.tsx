import React, { useState, FormEvent } from 'react';
import {useHistory} from 'react-router-dom';
import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg'

import './styles.css';

function TeacherForm() {
    const history = useHistory();

    const [scheduleItems, setScheduleItems] = useState([{week_day: 0, from: '', to: ''}])

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            {week_day: 0, from: '', to: ''}
        ])
    }

    function handleCreateClass(event: FormEvent) {
        event.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro realizado com sucesso!');
            history.push('/');
        }).catch(() => {
            alert('Erro no cadastro!')
        });

        console.log({
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            scheduleItems
        })
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if(index === position) {
                return { ...scheduleItem, [field]: value }
            }

            return scheduleItem
        });
        setScheduleItems(updatedScheduleItems);
    }

    return (
    <div id="page-teacher-form" className="container">
        <PageHeader
            title="Que incr??vel que voc?? quer dar aulas."
            description="O primeiro passo ?? preencher esse formul??rio de inscri????o"
        />
        <main>
            <form onSubmit={handleCreateClass}>
                <fieldset>
                    <legend>Seus dados</legend>

                    <Input
                        label="Nome completo"
                        name="name"
                        value={name}
                        onChange={(event) => {setName(event.target.value)}}
                    />

                    <Input
                        label="Avatar"
                        name="avatar"
                        value={avatar}
                        onChange={(event) => {setAvatar(event.target.value)}}
                    />
                    
                    <Input
                        label="WhatsApp"
                        name="whatsapp"
                        value={whatsapp}
                        onChange={(event) => {setWhatsapp(event.target.value)}}
                    />

                    <Textarea
                        label="Biografia"
                        name="bio"
                        value={bio}
                        onChange={(event) => {setBio(event.target.value)}}
                    />

                </fieldset>
                <fieldset>
                    <legend>Sobre a aula</legend>

                    <Select
                        label="Mat??ria"
                        name="subject"
                        value={subject}
                        onChange={(event) => {setSubject(event.target.value)}}
                        options={[
                            {value: 'Artes', label: 'Artes'},
                            {value: 'Matem??tica', label: 'Matem??tica'},
                            {value: 'Hist??ria', label: 'Hist??ria'},
                            {value: 'Geografia', label: 'Geografia'},
                            {value: 'Qu??mica', label: 'Qu??mica'},
                            {value: 'F??sica', label: 'F??sica'},
                            {value: 'Portugu??s', label: 'Portugu??s'},
                        ]}
                    />

                    <Input
                        label="Pre??o da sua hora-aula"
                        name="cost"
                        value={cost}
                        onChange={(event) => {setCost(event.target.value)}}
                    />

                </fieldset>

                <fieldset>
                    <legend>
                        Hor??rios dispon??veis
                        <button type="button" onClick={addNewScheduleItem}>
                            + Novo hor??rio
                        </button>
                    </legend>
                    
                    {scheduleItems.map((scheduleItem, index) => {
                        return (
                            <div key={scheduleItem.week_day} className="schedule-item">
                                <Select
                                    label="Dia da semana"
                                    name="week_day"
                                    onChange={event => setScheduleItemValue(index, 'week_day', event.target.value)}
                                    value={scheduleItem.week_day}
                                    options={[
                                        {value: '0', label: 'Domingo'},
                                        {value: '1', label: 'Segunda-feira'},
                                        {value: '2', label: 'Ter??a-feira'},
                                        {value: '3', label: 'Quarta-feira'},
                                        {value: '4', label: 'Quinta-feira'},
                                        {value: '5', label: 'Sexta-feira'},
                                        {value: '6', label: 'S??bado'},
                                    ]}
                                />
                                
                                <Input
                                    name="from"
                                    label="Das"
                                    type="time"
                                    onChange={event => setScheduleItemValue(index, 'from', event.target.value)}
                                    value={scheduleItem.from}
                                />
                                
                                <Input
                                    name="to"
                                    label="At??"
                                    type="time"
                                    onChange={event => setScheduleItemValue(index, 'to', event.target.value)}
                                    value={scheduleItem.to}
                                />
                            </div>
                        );
                    })}
                    
    
                </fieldset>

                <footer>
                    <p>
                        <img src={warningIcon} alt="Aviso importante"/>
                        Importante! <br />
                        Preencha todos os dados
                    </p>
                    <button type="submit">Salvar cadastro</button>
                </footer>
            </form>
        </main>
    </div>
    );
}

export default TeacherForm;