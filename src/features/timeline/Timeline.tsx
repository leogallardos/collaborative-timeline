import { useEffect, useMemo, useRef } from "react"
import { useGetTimelineQuery } from "./timelineApiSlice"
import styles from "./Timeline.module.css"

import { motion, AnimatePresence } from "framer-motion"
const Timeline = () => {
  const { data } = useGetTimelineQuery(undefined, { pollingInterval: 5000 })
  const sortedEntries = useMemo(
    () =>
      data ? [...data.entries].sort((a, b) => a.timestamp - b.timestamp) : [],
    [data],
  )
  const colors = [
    "#FF5733", 
    "#33FF57", 
    "#5733FF", 
    "#FFD700", 
    "#00FFFF", 
    "#FF69B4", 
    "#7CFC00", 
    "#FF4500", 
    "#4FC3F7", 
    "#CE93D8", 
  
  ]
  const previousEntriesLength = useRef(0)
  useEffect(() => {
    previousEntriesLength.current = sortedEntries.length
  }, [sortedEntries.length])
  return (
    <div className={styles.timeline}>
      <div className={styles.timelineLine}></div>
      <div className={styles.timelineStart}></div>
      <AnimatePresence>
        {sortedEntries.map((entry, index) => {
          const isNewEntry = index >= previousEntriesLength.current - 1
          return (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: isNewEntry ? -50 : 0 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.3 }}
              className={`${styles.timelineEntry} ${
                index % 2 === 0 ? styles.entryLeft : styles.entryRight
              }`}
            >
              <div className={styles.messageBox}>
                <p className={styles.messageText}>{entry.message.funFact}</p>
              </div>
              <div
                className={styles.timelineCircle}
                style={{
                  borderColor: colors[index % colors.length],
                }}
              >
                <img src={entry.author.avatarUrl} alt={entry.author.name} />
              </div>
              <div className={styles.metadata}>
                <div className={styles.metadataText}>
                  {entry.gitCommitMessage} <br />
                  {entry.author.name} <br />
                  {new Date(entry.timestamp).toLocaleString()}
                </div>
                <span className={styles.emoji}>
                  {entry.message.favoriteEmoji}
                </span>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
export default Timeline
