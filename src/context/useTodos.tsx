import { useContext } from "react"
import { TodoContext } from "./TodoContext"

export default function useTodos() {
  const context = useContext(TodoContext)
  if(context === undefined)
    throw new Error('TodoContext was used outside of the TodoProvider')
  return context;
}
