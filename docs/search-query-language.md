# Clay Search Query Language

Base URL: `https://search.clay.earth/search`

## Query Parameters

| Param            | Values                          |
| ---------------- | ------------------------------- |
| `term`           | Search query (see syntax below) |
| `limit`          | Results per page (e.g. `100`)   |
| `page`           | Page number (1-indexed)         |
| `sort_by`        | `firstName`, `lastName`         |
| `sort_direction` | `asc`, `desc`                   |
| `timezone`       | e.g. `America/New_York`         |

## Search Basics

| Term                | Description              |
| ------------------- | ------------------------ |
| `all`               | List everyone            |
| `"Mount Sinai"`     | Exact phrase match       |
| `-"The New Yorker"` | Exclude phrase           |

## Field Search

| Term                        | Description          |
| --------------------------- | -------------------- |
| `name:"Anchal Aggarwal"`    | Search within names  |
| `title:"founder"`           | Search job titles    |
| `organization:"CAA"`        | Search organizations |
| `bio:"a designer,"`         | Search bios          |
| `location:"NYC"`            | Search locations     |
| `note:"Worked with CJ"`    | Search note content  |
| `#cool`                     | Search note hashtags |

## Missing / Has Filters

| Term               | Description                     |
| ------------------ | ------------------------------- |
| `missing:name`     | No first/last name              |
| `source:email`     | Has email address               |
| `-source:email`    | No email address                |
| `source:phone`     | Has phone number                |
| `-source:phone`    | No phone number                 |
| `has:coordinates`  | Has location                    |
| `-has:coordinates` | No location                     |

## Interaction Counts

| Term               | Description               |
| ------------------ | ------------------------- |
| `emailcount:=1`    | Emailed exactly once      |
| `emailcount:<3`    | Emailed 3 times or less   |
| `meetingcount:=1`  | Only met once             |

## Integration Source

| Term                          | Description        |
| ----------------------------- | ------------------ |
| `integration:email`           | From email         |
| `integration:calendar`        | From calendar      |
| `integration:messages`        | From iMessage      |
| `integration:twitter`         | From Twitter       |
| `integration:instagram`       | From Instagram     |
| `integration:linkedin`        | From LinkedIn      |
| `integration:apple-contacts`  | From Apple Contacts|

## Social Filters

### Twitter

| Term                      | Description                          |
| ------------------------- | ------------------------------------ |
| `twitter:followers`       | People who follow me                 |
| `twitter:following`       | People I follow                      |
| `twitter:mutuals`         | Mutual follows                       |
| `twitter:only-followers`  | Follow me, I don't follow back       |
| `twitter:only-following`  | I follow, they don't follow back     |

### Instagram

| Term                        | Description                          |
| --------------------------- | ------------------------------------ |
| `instagram:followers`       | People who follow me                 |
| `instagram:following`       | People I follow                      |
| `instagram:mutuals`         | Mutual follows                       |
| `instagram:only-followers`  | Follow me, I don't follow back       |
| `instagram:only-following`  | I follow, they don't follow back     |

## Groups

| Term              | Description              |
| ----------------- | ------------------------ |
| `group:none`      | Not in any group         |
| `group:"Friends"` | In a specific group      |

## Date Filters

| Term                     | Description                      |
| ------------------------ | -------------------------------- |
| `created:>2024`          | Added to Clay since 2024         |
| `firstmet:=2024`         | First interacted in 2024         |
| `lastmet:<2020`          | Haven't interacted since 2020    |
| `lastevent:>2023-10-31`  | Had meeting since date           |
| `firstemail:=2021-01`    | First emailed in month           |
| `lastemail:<2022-01`     | Haven't emailed since            |
| `firsttext:=2024`        | First texted in year             |
| `lasttext:<2020`         | Haven't texted since             |

Date formats: `YYYY`, `YYYY-MM`, `YYYY-MM-DD`. Operators: `>`, `<`, `=`.

## Natural Language Shortcuts

| Term               | Description                        |
| ------------------ | ---------------------------------- |
| `last week`        | Interacted in last 7 days          |
| `last month`       | Interacted in last month           |
| `last quarter`     | Interacted in last 3 months        |
| `last six months`  | Interacted in last 6 months        |
| `a while ago`      | Not interacted in 3+ months        |
| `i met last week`  | Had meeting in last 7 days         |
| `i met last month` | Had meeting in last month          |
| `i met last quarter` | Had meeting in last 3 months     |
| `never met`        | No meetings ever                   |
| `upcoming birthdays` | Birthdays in next 6 months       |
| `reminders`        | Have upcoming reminders            |
| `notes`            | Have notes                         |

## Auth

- **Access token**: ~9 min lifespan
- **Refresh token**: ~30 day lifespan
- Refresh endpoint: `POST https://api.clay.earth/api/token/refresh/`
- Body: `{"refresh": "<refresh_token>"}`
- Returns: `{"access": "<new_access_token>", "refresh": "<new_refresh_token>"}`
