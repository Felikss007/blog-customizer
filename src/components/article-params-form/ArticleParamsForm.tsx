import { RadioGroup } from '@/ui/radio-group';
import { Select } from '@/ui/select';
import { Separator } from '@/ui/separator';
import { Text } from '@/ui/text';
import { useState } from 'react';
import {
  defaultArticleState,
  fontFamilyOptions,
  fontSizeOptions,
  fontColors,
  backgroundColors,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import type { ArticleStateType } from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = (): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(true);
  const [draft, setDraft] = useState<ArticleStateType>(defaultArticleState);
  const asideClass = isOpen
    ? `${styles.container} 
  ${styles.container_open}`
    : styles.container;
  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={() => setIsOpen((isOpen) => !isOpen)} />
      <aside className={asideClass}>
        <form className={styles.form}>
          <Text>Задайте параметры</Text>
          <Select
            title="Шрифт"
            options={fontFamilyOptions}
            selected={draft.fontFamilyOption}
            onChange={(option) => setDraft({ ...draft, fontFamilyOption: option })}
          />
          <RadioGroup
            name="fontSize"
            title="Размер шрифта"
            options={fontSizeOptions}
            selected={draft.fontSizeOption}
            onChange={(option) => setDraft({ ...draft, fontSizeOption: option })}
          />
          <Select
            title="Цвет шрифта"
            options={fontColors}
            selected={draft.fontColor}
            onChange={(option) => setDraft({ ...draft, fontColor: option })}
          />
          <Select
            title="Цвет фона"
            options={backgroundColors}
            selected={draft.backgroundColor}
            onChange={(option) => setDraft({ ...draft, backgroundColor: option })}
          />
          <Separator />
          <div className={styles.bottomContainer}>
            <Button title="Сбросить" htmlType="reset" type="clear" />
            <Button title="Применить" htmlType="submit" type="apply" />
          </div>
        </form>
      </aside>
    </>
  );
};
