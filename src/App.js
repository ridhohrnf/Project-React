import { DataProvider } from './Contexts/DataContext'
import './App.css'
import 'antd/dist/antd.css'
import Routes from './Routes/Routes'

function App() {
  return (
    <>
    <DataProvider>
      <Routes/>
      {/* <ListMovie/> */}
    </DataProvider>
    </>
  )
}

export default App