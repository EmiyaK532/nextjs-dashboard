//这是一个客户端组件
'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import {useDebouncedCallback} from 'use-debounce'
// import { useEffect } from 'react';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  // useEffect(()=>{
  //   console.log(searchParams)
  // }, [])

  //useDebouncedCallback进行防抖修饰handleSearch函数
  const handleSearch = useDebouncedCallback((term: string) => {
    // console.log(term)
    // console.log(searchParams.get('query'))
    console.log(`Searching... ${term}`)

    const params = new URLSearchParams(searchParams)
    //当用户输入新的搜索查询时，将page参数重置为‘1’，以确保搜索结果从第一页开始显示
    params.set('page', '1')
    // console.log(params)
    if(term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
    // console.log("Current searchParams: ", params.toString())
    // console.log(params.get('query'))
  }, 300)
  

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e )=> {
          handleSearch(e.target.value)
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
