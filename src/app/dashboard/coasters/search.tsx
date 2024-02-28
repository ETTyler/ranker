'use client';

import { Autocomplete } from '@mantine/core'
import { useEffect, useState } from 'react'

export default function Search() {
  const [value, setValue] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const coasterSearch  = async (coaster: string) => {
    if (coaster.length < 3) return {response: []}
    try {
      const res = await fetch(`/dashboard/coasters/api/search?coaster=${coaster}`)
      const data = await res.json()
      return data
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    coasterSearch(value).then(data => {
      setSearchResults(data.response.map((coaster: any) => coaster.value))
    })
  }, [value])
    
  return (
    <>
      <Autocomplete 
        w='20rem'
        placeholder="Search for a coaster"   
        data = {searchResults}
        value={value}
        onChange={setValue}
      />
    </>
  )
}
