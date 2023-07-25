import { Checkbox, InputField, RadioGroup, Toggle } from "@lonlat/shared/index";
import { Meta } from "@storybook/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";

const meta = {
  title: "Components/InputField",
  component: InputField,
} satisfies Meta<typeof InputField>;
export default meta;

export const Basic = () => {
  return <InputField label="Your website" hint="blog, portfolio" />;
};

export const Context = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState<string | null>("female");
  const [isAgree, setIsAgree] = useState(true);
  const [isEnabled, setIsEnabled] = useState(true);

  return (
    <div className="flex flex-column gap-4">
      <InputField
        label="What is your name"
        hint="Any hint related to input field"
        placeholder="Ex: Fernando"
        help="Help text for your input field"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      />
      <InputField
        label="What is your name"
        hint="Any hint related to input field"
        placeholder="Ex: Fernando"
        help="Help text for your input field"
        error="Input is required"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      />
      <InputField
        label="What is your name"
        hint="Any hint related to input field"
        placeholder="Ex: Fernando"
        help="Help text for your input field"
        warning="Only your firstname"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      />
      <InputField
        value={gender}
        onChange={(value: string | null) => {
          setGender(value);
        }}
        label="What is your gender"
        hint="You don't have to answer"
        as={RadioGroup}
        options={[
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
          { label: "I don't want to answer", value: "undefined" },
        ]}
        help="You still have to check a box"
      />
      <InputField
        value={gender}
        onChange={(value: string | null) => {
          setGender(value);
        }}
        label="What is your gender"
        hint="You don't have to answer"
        as={RadioGroup}
        error="This field is required"
        options={[
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
          { label: "I don't want to answer", value: "undefined" },
        ]}
        help="You still have to check a box"
      />

      <InputField
        value={gender}
        onChange={(value: string | null) => {
          setGender(value);
        }}
        label="What is your gender"
        hint="You don't have to answer"
        as={RadioGroup}
        warning="Make your choice"
        options={[
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
          { label: "I don't want to answer", value: "undefined" },
        ]}
        help="You still have to check a box"
      />
      <InputField
        checked={isAgree}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setIsAgree(e.target.checked)}
        label="Gender"
        hint="One hint"
        as={Checkbox}
      >
        I agree
      </InputField>
      <InputField
        checked={isAgree}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setIsAgree(e.target.checked)}
        label="Gender"
        hint="One hint"
        warning="Make your choice"
        as={Checkbox}
      >
        I agree
      </InputField>
      <InputField
        checked={isAgree}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setIsAgree(e.target.checked)}
        label="Gender"
        hint="One hint"
        error="This field is required"
        as={Checkbox}
      >
        I agree
      </InputField>

      <InputField
        checked={isEnabled}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setIsEnabled(e.target.checked)}
        label="Label"
        hint=""
        as={Toggle}
      >
        Enabled
      </InputField>
      <InputField
        checked={isEnabled}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setIsEnabled(e.target.checked)}
        label="Label"
        hint="One hint"
        warning="Make your choice"
        as={Toggle}
      >
        Enabled
      </InputField>
      <InputField
        checked={isEnabled}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setIsEnabled(e.target.checked)}
        label="Label"
        hint="One hint"
        error="This field is required"
        as={Toggle}
      >
        Enabled
      </InputField>
      <pre>
        name: {name}
        <br />
        gender: {gender}
        <br />
        agree: {isAgree ? "True" : "False"}
        <br />
        enabled: {isEnabled ? "True" : "False"}
      </pre>
    </div>
  );
};

export const References = () => {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    console.log("reference", ref.current);
  }, []);
  return <InputField ref={ref} label="Your website" hint="blog, portfolio" />;
};
