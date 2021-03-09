import { useMutation } from '@apollo/client'
import { LOGIN } from '@graphql/mutations'
import React, { useState } from 'react'

export const LoginForm = () => {
  const [userInfo, setUserInfo] = useState({
    email: 'long1@gmail.com',
    password: '123456',
  })
  const [loginLocal] = useMutation(LOGIN)

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      const { data } = await loginLocal({
        variables: {
          ...userInfo,
        },
      })

      window.location.href = '/'
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form>
      <div className="mb-4">
        <label className="block font-bold">Email</label>
        <input
          id="email"
          className="w-full shadow-sm rounded outline-none border border-gray-300 px-2 py-1"
          name="email"
          placeholder="email"
          value={userInfo.email}
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block font-bold">Password</label>
        <input
          id="password"
          className="w-full shadow-sm rounded outline-none border border-gray-300 px-2 py-1"
          type="password"
          name="password"
          placeholder="password"
          value={userInfo.password}
          onChange={(e) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
        />
      </div>
      <button
        className="bg-gray-400 hover:bg-gray-600 duration-200 px-2 py-1 rounded font-medium outline-none focus:outline-none"
        type="submit"
        onClick={handleSubmit}
      >
        Đăng nhập
      </button>
    </form>
  )
}
