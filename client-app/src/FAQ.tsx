import React, { Component } from 'react';
import { Container, List } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function FAQ() {

  return (
    <React.Fragment>
      <Container style={{ direction: "rtl", maxWidth: "400px" }}>
        <fieldset style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
          <legend style={{ fontSize: "1.2rem", fontWeight: "bold", padding: "0 8px" }}>
            سوالات متداول
          </legend>

          <List link relaxed>
            <List.Item as={Link}>اطلاعات نمادها</List.Item>
            <List.Item as={Link}>نسبتهای مالی (p/e, eps ,p/s,p/eگروه)</List.Item>
            <List.Item as={Link}>دیده بان بازار</List.Item>
            <List.Item as={Link}>سهامداران عمده</List.Item>
            <List.Item as={Link}>فیلتر نویسی</List.Item>
            <List.Item as={Link}>سابقه</List.Item>
            <List.Item as={Link}>NAV صندوق ها</List.Item>
            <List.Item as={Link}>وضعیت و نوع بازگشایی نماد</List.Item>
            <List.Item as={Link}>تغییر در اطلاعات عمومی شرکتها اعم از ادرس تلفن و... ( اطلاعات تب معرفی شرکت ها نماد)</List.Item>
            <List.Item as={Link}>نمودار تعاملی , نمودار حجم-قیمت</List.Item>
            <List.Item as={Link}>تغییر در هیات مدیره و مدیرعامل ( تب تغییرات هیئت مدیره در سایت )</List.Item>
          </List>
        </fieldset>
      </Container>
    </React.Fragment>
  );
}
