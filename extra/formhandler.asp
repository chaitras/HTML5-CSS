<%@  language="VBScript" %>
<% 
Option Explicit 
Response.Buffer = True
%><!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>General form examiner</title>
    <style>
        .tt {
            font-family: "Courier New", Courier, monospace;
        }
        th, td { padding: 3px 6px; }
        td:first-of-type { font-size: unset; font-family: Consolas, Courier, monospace; }
        td:last-of-type { font-weight: bold; }
    </style>
</head>
<body>
    <% 
If Request.ServerVariables("REQUEST_METHOD") <> "POST" Then
   Response.Write "<h2>Error: <span class=""tt"">post</span> not used</h2>"
   Response.Write "<p>You should use <span class=""tt"">post</span> in your form "
   Response.Write "(<span class=""tt"">&lt;form&nbsp;method=""post""&nbsp;...&gt;</span>) "
   Response.Write "to be able to use this script to test your form</p>"
   Response.Write "</body></html>"
   Response.End
End If
    %>
    <h2>Your form contained the following data</h2>
    <table border="1">

        <tr>
            <th>Field name</th>
            <th>Value</th>
        </tr>
        <tbody>
        <%
Dim strField
For Each strField In Request.Form
   Response.Write "<tr><td>" & strField & "</td>"
   Response.Write "<td>" & Request.Form(strField) & "</td></tr>"
Next
        %>
        </tbody>
    </table>

</body>
</html>
