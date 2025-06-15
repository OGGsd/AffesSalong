"use client"

import type React from "react"

import { useState } from "react"
import { X, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  className?: string
  placeholder?: string
  onSearch?: (query: string) => void
}

export default function SearchBar({ className, placeholder = "Sök...", onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) onSearch(query)
  }

  const clearSearch = () => {
    setQuery("")
    if (onSearch) onSearch("")
  }

  return (
    <div
      className={cn(
        "relative flex items-center rounded-full border bg-white/90 px-3 py-1.5 shadow-sm transition-all",
        isFocused ? "border-amber-300 ring-2 ring-amber-100" : "border-gray-200",
        className,
      )}
    >
      <Globe className="mr-2 h-4 w-4 text-gray-500" />
      <form onSubmit={handleSearch} className="flex-1">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
        />
      </form>
      {query && (
        <button
          type="button"
          onClick={clearSearch}
          className="ml-1 text-gray-400 hover:text-gray-600"
          aria-label="Rensa sökning"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
