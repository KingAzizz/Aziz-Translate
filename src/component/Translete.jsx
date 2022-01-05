import React from "react";
import axios from "axios";
import TransleteResult from "./TransleteResult";
import { useState } from "react";
const Translete = () => {
  const [primaryLanguage, setPrimaryLanguage] = useState("ar");
  const [secodaryLanguage, setSecodaryLanguage] = useState("en");
  const [words, setWords] = useState("");
  const [result,setResult] = useState('')
  const languages = ["ar", "en", "es", "fr", "no", "ru", "ja", "tr"];

  function translete() {
    const options = {
      method: 'GET',
      url: 'https://nlp-translation.p.rapidapi.com/v1/translate',
      params: {text: words, to: secodaryLanguage, from: primaryLanguage},
      headers: {
        'x-rapidapi-host': 'nlp-translation.p.rapidapi.com',
        'x-rapidapi-key': 'KEY'
      }
    };
    
    axios.request(options).then((response) => {
      setResult(response.data['translated_text'][secodaryLanguage]);
    }).catch((error) => {
      console.error(error);
    });
  }

  return (
    <div className="translete">
      <table>
        <tbody>
          <tr>
            <td className="primary-td">Primary Language</td>
            <td>
              <textarea
                className="text-box"
                
                cols="20"
                rows="8"
                onChange={(e) => setWords(e.target.value)}
              ></textarea>
            </td>
            <td>
              <select
                name="langauge-first-option"
                value={primaryLanguage}
                onChange={(e) => setPrimaryLanguage(e.target.value)}
              >
                {languages.map((language, index) => (
                  <option key={index}>{language}</option>
                ))}
              </select>
            </td>
          </tr>
          <tr>
            <td className="second-td">Secondary Language</td>
            <td>
              <textarea
                placeholder="الترجمه"
                className="text-box"
                cols="20"
                rows="8"
                onChange={(e) => setWords(e.target.value)}
                value={result}
              ></textarea>
            </td>
            <td>
              <select
                name="langauge-second-option"
                value={secodaryLanguage}
                onChange={(e) => setSecodaryLanguage(e.target.value)}
              >
                {languages.map((language, index) => (
                  <option key={index}>{language}</option>
                ))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
      <button className="translete-btn" onClick={translete}>
        Translete
      </button>

      <TransleteResult result={result} />
    </div>
  );
};

export default Translete;
