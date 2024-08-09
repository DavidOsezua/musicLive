import React from 'react'
import Genre from './Genre';
import styles from './GenreScroll.module.css'

const GenreScroll = () => {
  return (
    <div className={styles.check}>
      <Genre/>
    </div>
  );
}

export default GenreScroll