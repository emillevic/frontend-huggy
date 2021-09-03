import Vuetify from 'vuetify'
import axios from "axios";

import {
    createLocalVue,
    mount
} from '@vue/test-utils'
import FormDialog from "@/components/modals/Form";
import ShowDialog from "@/components/modals/Show";

jest.mock("axios", () => Object.assign(
    jest.fn(),
    { get: jest.fn(() => Promise.resolve({ data: {} })) }
  ));


describe('FormDialog.vue', () => {
    const localVue = createLocalVue()
    let vuetify

    const App = document.createElement("div");
    App.setAttribute("data-app", true);
    document.body.appendChild(App);

    beforeEach(() => {
        vuetify = new Vuetify()
    })

    it('should open form dialog to add new contact', async () => {
        const contactId = ''
        const wrapper = mount(FormDialog, {
            localVue,
            vuetify,
            propsData: {
                contactId,
                dialog: true
            }
        })
        const title = wrapper.find('.card-title')

        expect(title.text()).toContain('Adicionar novo contato')
    })
    it('should open form dialog to update contact', async (done) => {
        const wrapper = mount(FormDialog, {
            localVue,
            vuetify,
            propsData: {
                contactId: '',
                dialog: true
            },
            mocks: { axios: axios }
        })
        wrapper.setProps({ contactId: '123456' })
        wrapper.vm.$nextTick(() => {
            const title = wrapper.find('.card-title')
    
            expect(title.text()).toContain('Editar contato')
            done()
          })
    })
    it('should identify empty required inputs', async () => {
        const contactId = ''
        const wrapper = mount(FormDialog, {
            localVue,
            vuetify,
            propsData: {
                contactId,
                dialog: true
            }
        })
        const textFieldWrapper = wrapper.find('.v-text-field')
        const button = wrapper.find('.btn-confirm')
        
        await button.trigger('click')
        const text = textFieldWrapper.find('.v-messages__message')
        expect(text.text()).toContain('Campo obrigatório')
    })
})