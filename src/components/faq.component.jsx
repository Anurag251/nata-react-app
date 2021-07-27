import React, { useState } from 'react';

const FAQ = ({ faqs }) => {
  // console.log(faqs);
  const [showCard, setShowCard] = useState(false);
  const [id, setId] = useState(null);

  return (
    <div className="faq">
      <div className="container">
        <div className="title">Everything you need to know</div>

        <div className="faq-list">
          <ul>
            {faqs.map((faq) => (
              <li
                className="list"
                key={faq.id}
                onClick={(e) => {
                  if (id === faq.id) {
                    setId(faq.id);
                    setShowCard(!showCard);
                  } else {
                    setId(faq.id);
                    setShowCard(true);
                  }
                }}
              >
                <div className="heading">
                  <i
                    className={`${
                      faq.id === id && showCard ? 'rotate' : ''
                    } fas fa-chevron-right`}
                  ></i>{' '}
                  {faq.title}
                </div>
                <div
                  className={`${
                    faq.id === id && showCard ? 'show-desc' : ''
                  } desc`}
                >
                  <p>{faq.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
