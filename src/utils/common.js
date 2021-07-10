import { useState } from 'react'
import { toast } from 'react-toastify'

// convert object to FormData
export const notify = (type, message) => {
  if (type === 'success') {
    toast.success(message, {
      style: { fontSize: 16 },
    })
  } else if (type === 'error') {
    // if (!message) message = 'Something Went Wrong. Try Again!'
    toast.error(message, {
      style: { fontSize: 16 },
    })
  } else if (type === 'warning') {
    toast.warning(message)
  } else {
    toast(message)
  }
}