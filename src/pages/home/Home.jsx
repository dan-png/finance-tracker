import { useAuthContext } from '../../hooks/useAuthContext'
import {useCollection} from '../../hooks/useCollection'


// Styles
import styles from './Home.module.css'

// Components
import Transactionform from './Transactionform'
import TransactionList from './TransactionList'


function Home() {
  const { user } = useAuthContext()
  const {documents, error} = useCollection('transactions', ["uid", "==", user.uid], ['createdAt','desc'])
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && <TransactionList transactions={documents}/>}
      </div>
      <div className={styles.sidebar}>
        <Transactionform uid={user.uid }/>
      </div>
    </div>
  )
}
export default Home