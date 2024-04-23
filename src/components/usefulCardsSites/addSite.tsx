import { Field } from 'formik'
import { Form } from 'formik'
import { ErrorMessage } from 'formik'
import { Formik } from 'formik'
import { v4 as uuidv4 } from 'uuid'
import React from 'react'
import { UsefulSitesType } from '../../store/types/user'
import s from './addSite.module.scss'
import { CreateSite, UploadImg } from '../../firebase'
import { firestore } from '../../firebase/config'
type PropsModal = {
  statusModal: (n: boolean) => void
  getNewSites: () => void
}

export const AddSite = ({ statusModal, getNewSites }: PropsModal) => {
  const refDiv = React.useRef<HTMLDivElement>(null)
  const [load, setLoad] = React.useState(false)
  const [img, setImg] = React.useState('')
  const [imageName, setImageName] = React.useState('')
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (refDiv.current && !refDiv.current.contains(event.target as Node)) {
        statusModal(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  const downloadFile = async (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const image = event.target.files[0]
      setImg(image)
      const { name } = image
      setImageName(name)
    }
  }
  React.useEffect(() => {
    console.log(img)
  }, [img])
  return (
    <>
      <div className={s.modal} ref={refDiv}>
        <Formik
          enableReinitialize
          initialValues={{ name: '', description: '', urlSite: '', urlImg: '' }}
          validate={(values: UsefulSitesType) => {
            const errors: Partial<UsefulSitesType> = {}
            if (!values.name) {
              errors.name = 'Обязательное поле'
            }
            if (!values.urlSite) {
              errors.urlSite = 'Обязательное поле'
            }
            if (!values.urlImg && !imageName) {
              errors.urlImg = 'Обязательное поле'
            }
            return errors
          }}
          onSubmit={async (values: UsefulSitesType, { resetForm }: { resetForm: () => void }) => {
            try {
              setLoad(true)
              const res = { ...values, id: uuidv4(), urlImg: imageName }
              await UploadImg({ objImg: img, uid: 'sites' })
              console.log(res)
              await CreateSite({ uid: values.id, firestore, obj: res })
              resetForm()
              getNewSites()
            } catch (error) {
              console.log(error)
            } finally {
              setLoad(false)
            }
          }}
        >
          {() => (
            <Form className={s.form}>
              <label className={s.label}>
                Название сайта
                <Field type='text' name='name' placeholder='Название сайта' className={s.inputText} />
                <ErrorMessage name='name' component='div' className={s.errorMessage} />
              </label>
              <label className={s.label}>
                Описание
                <Field type='text' name='description' placeholder='Описание' className={s.inputText} />
              </label>
              <label className={s.label}>
                Ссылка
                <Field type='text' name='urlSite' placeholder='Ссылка' className={s.inputText} />
                <ErrorMessage name='urlSite' component='div' className={s.errorMessage} />
              </label>
              <label className={s.label}>
                Лого сайта
                <Field type='file' name='urlImg' onChange={downloadFile} placeholder='Лого сайта' accept='image/jpeg, image/png' />
                <ErrorMessage name='urlImg' component='div' className={s.errorMessage} />
              </label>
              <button type='submit' disabled={load} className={s.button}>
                {!load ? 'Добавить' : 'Загрузка'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}
