import _ from 'lodash'
import axios from 'axios'

const apiUrl = 'http://localhost:3000'


const submittedArrayIHC = [
  "5cd3f1c102d6860fe9a677cf",
  "5cd3f1c102d6860fe9a677bd",
  "5cd3f1c102d6860fe9a677c6",
  "5cd3f1c102d6860fe9a677ca",
  "5cd3f1c102d6860fe9a677d2",
]

const submittedArrayIrcIhc = [
  "5cd3f1c102d6860fe9a677d2",
  "5cd3f1c102d6860fe9a677cf",
  "5cd3f1c102d6860fe9a677ca",
  "5cd3f1c102d6860fe9a677c7",
  "5cd3f1c102d6860fe9a677c6",
  "5cd3f1c102d6860fe9a677bd"
]


const patho = [
  "5cd3f1c102d6860fe9a677bd",
  "5cd3f1c102d6860fe9a677cf",
  "5cd3f1c102d6860fe9a677ca",
  "5cd3f1c102d6860fe9a677c4",
  "5cd3f1c102d6860fe9a677d2",
]


const submitted = submittedArrayIHC

const getAnswer = async () => {

  try {
    const auth = await axios.post(`${apiUrl}/api/auth/login`, {
      email: 'coco@gmail.com',
      password: 'coco'
    })

    const answer = await axios.get(`${apiUrl}/answer`, {
      headers: {
        authorization: auth.data.token
      }
    })


    let  result = null
    for (let i = 0; i < answer.data.length; i++) {
      let ans = answer.data

      for (let y = 0; y < ans[i].conditions_group.length; y++) {

        let condition = ans[i].conditions_group[y]

        let diff = _.intersectionWith(submitted, condition.fields, _.isEqual)

        if (diff.length === condition.fields.length) {
          result = ans[i]
        }
      }
    }


    console.log('result', result)

    const groups = answer.data.map(ans => {

      ans.conditions_group.map(condition => {
        let diff = _.intersection(submitted, condition.fields)

        if (diff.length === condition.fields.length) {
          if (_.isEqual(diff, submitted)) {
            console.log('ans', ans)
            return ans
          }
        }
      })
    })

    // console.log('groups', groups)


  } catch (error) {
    console.log('error', error)
  }
}


getAnswer()