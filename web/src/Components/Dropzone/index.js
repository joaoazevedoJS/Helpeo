import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'

import './style.css'

function Dropzone({ onFile }) {
  const [selectedFileUrl, setSelectedFileUrl] = useState('')

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0]

    const fileUrl = URL.createObjectURL(file)

    setSelectedFileUrl(fileUrl)
    onFile(file)
  }, [onFile])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*'
  })

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />

      {
        selectedFileUrl ? (
          <>
            <img src={selectedFileUrl} alt="Point Preview" />
            <p className="selected">
              <FiUpload />
              Clique para trocar de imagem!
            </p>
          </>
        ) : (
          <p className="notSelected">
            <FiUpload />
            Clique aqui para adicionar uma imagem!
          </p>
        )
      }
    </div>
  )

}

export default Dropzone
