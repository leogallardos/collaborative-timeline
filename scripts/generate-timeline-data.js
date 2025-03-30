import fs from "fs"
import path from "path"
import { execSync } from "child_process"

const mdFilesDir = "./public/contributions"
const outputJsonPath = "./public/timeline.json"

async function getGithubLogin(email) {
  try {
    const response = await fetch(
      `https://api.github.com/search/users?q=${email}`,
    )
    const data = await response.json()
    if (data.items && data.items.length > 0) {
      return data.items[0].login
    }
    return ""
  } catch (error) {
    console.error("Error fetching GitHub avatar:", error)
    return ""
  }
}

async function getGitMetadata(filePath) {
  const commitHash = execSync(`git log -n 1 --pretty=format:"%H" ${filePath}`)
    .toString()
    .trim()
  const timestamp =
    parseInt(
      execSync(`git log -n 1 --pretty=format:"%ct" ${filePath}`)
        .toString()
        .trim(),
    ) * 1000
  const authorName = execSync(`git log -n 1 --pretty=format:"%an" ${filePath}`)
    .toString()
    .trim()
  const authorEmail = execSync(`git log -n 1 --pretty=format:"%ae" ${filePath}`)
    .toString()
    .trim()
  const githubUserName = await getGithubLogin(authorEmail)
  console.log("githubUserName", githubUserName)
  const authorAvatarUrl = `https://avatars.githubusercontent.com/${githubUserName}?size=80`

  return {
    commitHash,
    timestamp,
    author: {
      name: authorName,
      email: authorEmail,
      avatarUrl: authorAvatarUrl,
    },
  }
}

function parseMarkdown(filePath) {const content = fs.readFileSync(filePath, 'utf8');
    const funFactRegex = /\*\*Fun Fact:\*\*\s*(.*?)\s*\n/;
    const emojiRegex = /\*\*Emoji:\*\*\s*(.*)/;
  
  
    const funFactMatch = content.match(funFactRegex);
    const emojiMatch = content.match(emojiRegex);
  
  
    const funFact = funFactMatch ? funFactMatch[1].trim() : '';
    const favoriteEmoji = emojiMatch ? emojiMatch[1].trim() : '';
  
    return { funFact, favoriteEmoji };
}

async function generateTimelineData() {
  const mdFiles = fs
    .readdirSync(mdFilesDir)
    .filter(file => path.extname(file) === ".md")
  const entries = await Promise.all(
    mdFiles.map(async file => {
      const filePath = path.join(mdFilesDir, file)
      const gitMetadata = await getGitMetadata(filePath)
      const message = parseMarkdown(filePath)
      const rawMessage = fs.readFileSync(filePath, "utf8") // Get raw Markdown

      return {
        id: gitMetadata.commitHash, // Generate unique ID
        commitHash: gitMetadata.commitHash,
        timestamp: gitMetadata.timestamp,
        author: gitMetadata.author,
        gitCommitMessage: execSync(
          `git log -n 1 --pretty=format:"%s" ${filePath}`,
        )
          .toString()
          .trim(),
        message,
        rawMessage,
      }
    }),
  )

  const jsonData = { entries }
  fs.writeFileSync(outputJsonPath, JSON.stringify(jsonData, null, 2))
  console.log("timeline-data.json generated successfully!")
}

generateTimelineData()
