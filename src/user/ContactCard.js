import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaPhone,
  FaEnvelope,
  FaInstagram,
  FaFacebook,
  FaRegAddressBook,
} from "react-icons/fa";
import "../css/cssUser/contactCard.css"; // tetap gunakan file CSS yang dimodifikasi

const ContactCard = () => {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const response = await axios.get("http://localhost:3001/kontak");
      if (response.data.length > 0) {
        setContact(response.data[0]); // karena respons API array
      }
    } catch (error) {
      console.error("Gagal mengambil data kontak:", error);
    }
  };

  return (
    <div className="contact-wrapper-user">
      <div className="contact-card-user">
        <div className="contact-title-user">
          <FaRegAddressBook className="icon-user" />
          HUBUNGI KAMI
        </div>
        {contact ? (
          <div className="contact-list-user">
            <div className="contact-item-user">
              <FaPhone className="icon-user" />
              <span>{contact.nomor}</span>
            </div>
            <div className="contact-item-user">
              <FaEnvelope className="icon-user" />
              <span>{contact.email}</span>
            </div>
            <div className="contact-item-user">
              <FaFacebook className="icon-user" />
              <span>{contact.facebook}</span>
            </div>
            <div className="contact-item-user">
              <FaInstagram className="icon-user" />
              <span>{contact.instagram}</span>
            </div>
          </div>
        ) : (
          <p>Loading kontak...</p>
        )}
      </div>
    </div>
  );
};

export default ContactCard;
