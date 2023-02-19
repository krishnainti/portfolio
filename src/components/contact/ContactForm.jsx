import { useEffect, useState } from "react";
import axios from "axios";

import Button from "../reusable/Button";
import FormInput from "../reusable/FormInput";
import { validateForm } from "./utils";

import { toast } from "react-toastify";

const initialState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  errors: {},
  process: false,
};

const ContactForm = () => {
  const [form, setForm] = useState(initialState);

  const onSubmit = () => {
    setForm({ ...form, process: true });
    const { errors, isValid } = validateForm(form);

    if (isValid) {
      const payload = { ...form };
      delete payload.errors;
      delete payload.process;

      axios
        .post(
          "https://5sv1twcieh.execute-api.ap-northeast-1.amazonaws.com/test",
          payload
        )
        .then((response) => {
          if (response.data?.body === "Error") {
            toast("Something went wrong, try again in some time.", {
              type: "error",
            });
          } else {
            toast(
              "Thank you for reaching out to me, will get back to you soon via email.",
              {
                type: "success",
              }
            );
          }
        })
        .catch((error) => {
          console.error("error ->", error);
          toast("Something went wrong, try again in some time.", {
            type: "error",
          });
        })
        .finally(() => setForm(initialState));
    } else {
      setForm({ ...form, errors });
    }
  };

  return (
    <div className="w-full lg:w-1/2">
      <div className="leading-loose">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="max-w-xl m-4 p-6 sm:p-10 bg-secondary-light dark:bg-secondary-dark rounded-xl shadow-xl text-left"
        >
          <p className="font-general-medium text-primary-dark dark:text-primary-light text-2xl mb-8">
            Contact Form
          </p>

          <FormInput
            inputLabel="Full Name"
            labelFor="name"
            inputId="name"
            inputName="name"
            placeholderText="Your Name"
            ariaLabelName="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            value={form.name}
            error={form.errors?.name}
          />
          <FormInput
            inputLabel="Email"
            labelFor="email"
            inputId="email"
            inputName="email"
            placeholderText="Your email"
            ariaLabelName="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            value={form.email}
            error={form.errors?.email}
          />
          <FormInput
            inputLabel="Subject"
            labelFor="subject"
            inputId="subject"
            inputName="subject"
            placeholderText="Subject"
            ariaLabelName="Subject"
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            value={form.subject}
            error={form.errors?.subject}
          />

          <div className="mt-6">
            <label
              className="block text-lg text-primary-dark dark:text-primary-light mb-2"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              className="w-full px-5 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm text-md"
              id="message"
              name="message"
              cols="14"
              rows="6"
              aria-label="Message"
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              value={form.message}
            />
            {form.errors?.message && (
              <div className="text-error">{form.errors?.message}</div>
            )}
          </div>

          <div className="font-general-medium w-40 px-4 py-2.5 text-white text-center font-medium tracking-wider bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 rounded-lg mt-6 duration-500">
            <Button
              title="Send Message"
              type="submit"
              aria-label="Send Message"
              disabled={form.process}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
